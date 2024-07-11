import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import './Clients.css';

const Clients = () => {
  const [startCounting, setStartCounting] = useState(false);

  return (
    <div className='clients'>
      <motion.div
        className='line'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
        >
        </motion.div>
      <motion.div
        className='container'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
        onViewportEnter={() => setStartCounting(true)}
        >
        <h1>{startCounting ? <CountUp start={0} end={50} duration={4} separator="," /> : 0}K</h1>
        <p>Our Active <br/>Users</p>
        <div className='line2'></div>
        <h1>{startCounting ? <CountUp start={0} end={43} duration={4} separator="," /> : 0}K</h1>
        <p>Our Art <br/>Work</p>
        <div className='line2'></div>
        <h1>{startCounting ? <CountUp start={0} end={38} duration={4} separator="," /> : 0}K</h1>
        <p>Available <br/>Artists</p>
        <div className='line2'></div>
        <h1>{startCounting ? <CountUp start={0} end={34} duration={4} separator="," /> : 0}K</h1>
        <p>Our <br/>Products</p>
      </motion.div>
      <motion.div
        className='line'
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.1 }}
        >
        </motion.div>
    </div>
  );
};

export default Clients;