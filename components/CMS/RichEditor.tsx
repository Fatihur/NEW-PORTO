import React, { useEffect, useRef } from 'react';
import { Bold, Italic, List, Type, Link, ListOrdered, Quote } from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  minHeight?: string;
}

const RichEditor: React.FC<RichEditorProps> = ({ value, onChange, label, minHeight = "200px" }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Handle external updates (only if content is significantly different to avoid cursor jumps)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
       // Simple check to prevent clearing user focus if they are typing
       if (document.activeElement !== editorRef.current) {
         editorRef.current.innerHTML = value || '';
       }
    }
  }, [value]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const ToolbarButton: React.FC<{ icon: React.ReactNode, cmd: string, arg?: string }> = ({ icon, cmd, arg }) => (
    <button
      type="button"
      onClick={() => execCommand(cmd, arg)}
      className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-sm transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{label}</label>}
      
      <div className="border border-zinc-300 bg-white focus-within:border-zinc-900 transition-colors">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-zinc-200 bg-zinc-50">
          <ToolbarButton icon={<Bold className="w-4 h-4" />} cmd="bold" />
          <ToolbarButton icon={<Italic className="w-4 h-4" />} cmd="italic" />
          <div className="w-px h-4 bg-zinc-300 mx-2"></div>
          <ToolbarButton icon={<Type className="w-4 h-4" />} cmd="formatBlock" arg="h3" />
          <ToolbarButton icon={<Quote className="w-4 h-4" />} cmd="formatBlock" arg="blockquote" />
          <div className="w-px h-4 bg-zinc-300 mx-2"></div>
          <ToolbarButton icon={<List className="w-4 h-4" />} cmd="insertUnorderedList" />
          <ToolbarButton icon={<ListOrdered className="w-4 h-4" />} cmd="insertOrderedList" />
        </div>

        {/* Editable Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-4 outline-none prose prose-sm max-w-none prose-headings:font-bold prose-p:text-zinc-600"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
};

export default RichEditor;