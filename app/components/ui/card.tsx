// 'use client';
// import { QAResponse } from "@/app/types/qa";
// import React from "react";

// interface CardProps {
//   data: QAResponse;
// }
// const Card = ({data}: CardProps ) => {
//   console.log(">>", data);
//   return (
//     <div className="w-full h-96 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 ">
//       <div className="text-lg font-semibold">{data.question}</div>
//       <div className="flex flex-col gap-2">

//       </div>
//     </div>
//   );
// };

// export default Card;
import React from "react";
import { motion } from "framer-motion";
import { QAResponse } from "@/app/types/qa";

// Define animation variants for children
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

// const headerVariants = {
//   hidden: { opacity: 0, x: -100 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
// };

const Card = ({ data }: { data: QAResponse }) => {
  return (
    <motion.div
      className="p-4 "
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.4, // Stagger the children animations
          },
        },
      }}
    >
      {/* Animate the question */}
      <motion.h1
        className="text-3xl font-bold mb-4"
        variants={fadeInVariants}
        // variants={headerVariants}
        custom={0.5} // delay for h1
      >
        {data.question}
      </motion.h1>

      {/* Animate the options */}
      {data.options.map((option, index) => (
        <motion.p
          key={index}
          className="mb-8 text-lg font-medium flex items-center gap-3"
          variants={fadeInVariants}
          custom={0.2 + index * 0.1} // incremental delay for options
        >
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          {option}
        </motion.p>
      ))}

      {/* Animate the answer */}
      <motion.p
        className="text-sm text-gray-500 mt-4"
        variants={fadeInVariants}
        custom={0.4} // delay for the answer
      >
        Answer: {data.answer}
      </motion.p>
    </motion.div>
  );
};

export default Card;
