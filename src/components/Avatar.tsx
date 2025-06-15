import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  type: 'punjabi' | 'south-indian' | 'northeast' | 'farmer';
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  emotion?: 'happy' | 'excited' | 'thinking' | 'celebrating';
}

const Avatar: React.FC<AvatarProps> = ({ type, isActive = false, size = 'md', emotion = 'happy' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const avatarData = {
    punjabi: {
      bg: 'bg-gradient-to-br from-orange-400 to-red-500',
      emoji: '👳🏽‍♂️',
      name: 'Simran Singh',
      region: 'Punjab'
    },
    'south-indian': {
      bg: 'bg-gradient-to-br from-pink-400 to-purple-500',
      emoji: '👩🏽‍🦱',
      name: 'Priya Devi',
      region: 'Tamil Nadu'
    },
    northeast: {
      bg: 'bg-gradient-to-br from-green-400 to-blue-500',
      emoji: '🧒🏽',
      name: 'Tenzin Norbu',
      region: 'Assam'
    },
    farmer: {
      bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      emoji: '👨🏽‍🌾',
      name: 'Raman Kaka',
      region: 'Haryana'
    }
  };

  const avatar = avatarData[type];

  const emotionAnimations = {
    happy: { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] },
    excited: { scale: [1, 1.1, 1], y: [0, -5, 0] },
    thinking: { rotate: [0, -5, 5, 0] },
    celebrating: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
  };

  return (
    <motion.div
      animate={isActive ? emotionAnimations[emotion] : {}}
      transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
      className={`${sizeClasses[size]} ${avatar.bg} rounded-full flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Avatar Emoji */}
      <span className="text-2xl">{avatar.emoji}</span>
      
      {/* Active Indicator */}
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
        />
      )}
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {avatar.name} - {avatar.region}
      </div>
    </motion.div>
  );
};

export default Avatar;