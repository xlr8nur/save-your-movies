import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const BouncingCirclesText = ({
  text,
  colors = { first: "#9E7AFF", second: "#FE8BBB" },
  className,
  sparklesCount = 10,
  ...props
}) => {
  const [circles, setCircles] = useState([]);

  const memoizedColors = useMemo(() => colors, [colors.first, colors.second]);

  useEffect(() => {
    const generateCircle = () => {
      const circleX = `${Math.random() * 100}%`;
      const circleY = `${Math.random() * 100}%`;
      const color = Math.random() > 0.5 ? memoizedColors.first : memoizedColors.second;
      const size = Math.random() * 15 + 5;
      const delay = Math.random() * 2;
      const animationDuration = Math.random() * 1.5 + 1;
      return { circleX, circleY, color, size, delay, animationDuration };
    };

    const newCircles = Array.from({ length: sparklesCount }, generateCircle);
    setCircles(newCircles);
  }, [memoizedColors, sparklesCount]);

  return (
    <div className={`text-4xl ${className}`} {...props}>
      <span className="relative inline-block">
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: circle.size,
              height: circle.size,
              backgroundColor: circle.color,
              left: circle.circleX,
              top: circle.circleY,
            }}
            animate={{
              y: ["0%", "30%", "0%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: circle.animationDuration,
              repeat: 3,
              delay: circle.delay,
              repeatType: "mirror",
            }}
          />
        ))}
        <strong>{text}</strong>
      </span>
    </div>
  );
};

export default BouncingCirclesText;