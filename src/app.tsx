import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Homepage from '@/pages/homepage';
import PageNotFound from '@/pages/not-found';

export default function App() {
    const location = useLocation();
    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar />
            <main className='flex flex-1 flex-col items-center justify-center'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className='flex w-full items-center justify-center'>
                        <Routes location={location} key={location.pathname}>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/*' element={<PageNotFound />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}
