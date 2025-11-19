
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Trophy, RefreshCcw, Play, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SnakeGameProps {
  onClose: () => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20; // px
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const SPEED = 100;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const SnakeGame: React.FC<SnakeGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const directionRef = useRef<Direction>('RIGHT'); 

  useEffect(() => {
    const stored = localStorage.getItem('fatih_snake_highscore');
    if (stored) setHighScore(parseInt(stored));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('fatih_snake_highscore', score.toString());
    }
  }, [score, highScore]);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || !isPlaying) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (directionRef.current) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check collisions (Walls)
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setIsGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Check collisions (Self)
      if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
        setIsGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check Food
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop(); // Remove tail
      }

      return newSnake;
    });
  }, [food, isGameOver, isPlaying, generateFood]);

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, SPEED);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isGameOver, moveSnake]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') directionRef.current = 'UP';
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') directionRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
          break;
      }
      setDirection(directionRef.current);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Drawing Canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#fafafa'; // Zinc-50
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid (Subtle)
    ctx.strokeStyle = '#f4f4f5'; // Zinc-100
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#71717a'; // Zinc-500
    const p = 4; // padding
    ctx.fillRect(food.x * CELL_SIZE + p, food.y * CELL_SIZE + p, CELL_SIZE - p*2, CELL_SIZE - p*2);

    // Snake
    snake.forEach((seg, index) => {
      ctx.fillStyle = index === 0 ? '#18181b' : '#3f3f46'; // Zinc-950 Head, Zinc-700 Body
      ctx.fillRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      
      // Gap for aesthetic
      ctx.strokeStyle = '#fafafa';
      ctx.lineWidth = 1;
      ctx.strokeRect(seg.x * CELL_SIZE, seg.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

  }, [snake, food]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white p-6 rounded-sm shadow-2xl max-w-md w-full border border-zinc-200 relative flex flex-col max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-zinc-400" />
            <div>
               <div className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">High Score</div>
               <div className="font-mono font-bold text-lg">{highScore}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
               <div className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Score</div>
               <div className="font-mono font-bold text-lg text-zinc-900">{score}</div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Board Container - Responsive scaling */}
        <div className="relative border border-zinc-200 bg-zinc-50 aspect-square flex items-center justify-center overflow-hidden mb-6 w-full mx-auto max-w-[400px]">
          <canvas 
            ref={canvasRef} 
            width={CANVAS_SIZE} 
            height={CANVAS_SIZE} 
            className="w-full h-full object-contain"
          />
          
          {/* Start Overlay */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[2px]">
              <button 
                onClick={resetGame}
                className="flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-wider hover:bg-zinc-800 transition-transform hover:scale-105 shadow-lg text-sm md:text-base"
              >
                <Play className="w-5 h-5" /> Start Game
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-[2px]">
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">Game Over</h3>
              <p className="text-zinc-500 mb-6">Final Score: {score}</p>
              <button 
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors text-sm md:text-base"
              >
                <RefreshCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          )}
        </div>

        {/* Controls Hint / Mobile Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
            <div className="hidden md:block text-xs text-zinc-400 font-mono">
              Use <span className="bg-zinc-100 border border-zinc-200 px-1 rounded">Arrow Keys</span> to move
            </div>

            {/* Mobile D-Pad */}
            <div className="md:hidden w-full max-w-[200px] flex flex-col items-center gap-2">
               <button onClick={() => { if(directionRef.current !== 'DOWN') directionRef.current = 'UP'; }} className="p-3 bg-zinc-100 rounded active:bg-zinc-200 w-12 h-12 flex items-center justify-center"><ChevronUp /></button>
               <div className="flex gap-4">
                  <button onClick={() => { if(directionRef.current !== 'RIGHT') directionRef.current = 'LEFT'; }} className="p-3 bg-zinc-100 rounded active:bg-zinc-200 w-12 h-12 flex items-center justify-center"><ChevronLeft /></button>
                  <button onClick={() => { if(directionRef.current !== 'LEFT') directionRef.current = 'RIGHT'; }} className="p-3 bg-zinc-100 rounded active:bg-zinc-200 w-12 h-12 flex items-center justify-center"><ChevronRight /></button>
               </div>
               <button onClick={() => { if(directionRef.current !== 'UP') directionRef.current = 'DOWN'; }} className="p-3 bg-zinc-100 rounded active:bg-zinc-200 w-12 h-12 flex items-center justify-center"><ChevronDown /></button>
            </div>

            <div className="hidden md:block text-[10px] text-zinc-300 uppercase tracking-widest">
                Snake v1.0
            </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default SnakeGame;
