import { ProjectCard, ProjectCardProps } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects: ProjectCardProps[] = [
    {
        title: 'AniDis - Anime Discussion Platform',
        imageUrl: '/projects/anime-discuss.png',
        description: [
            'AniDis is a MERN stack-based platform where anime fans can engage in threaded discussions about their favorite series.',
            'It offers daily updates on the latest episodes, highlights trending anime, and provides dedicated threads for specific shows, allowing users to discuss, share opinions, and stay connected to the anime community.',
        ].join(' '),
        technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
        projectUrl: 'https://anime-discuss.onrender.com/',
        githubUrl: 'https://github.com/luut189/anime-discuss',
    },
    {
        title: 'Tetris Clone (Biquadris)',
        imageUrl: '/projects/biquadris.png',
        description: [
            'A Tetris game developed using C++ with a focus on Software Development Lifecycle (SDLC), including planning, UML modeling, testing, and deployment.',
            'Implemented Object-Oriented Programming (OOP) principles with design patterns like Observer, Decorator, and Factory for maintainability.',
        ].join(' '),
        technologies: ['C++', 'Make', 'Valgrind'],
        githubUrl: 'https://github.com/ntung110/cs246-f24-biquadris',
    },
    {
        title: '2D Game',
        imageUrl: '/projects/2d-game.png',
        description: [
            'A top-down 2D game built in Java, demonstrating performance optimizations for handling over 10,000 entities.',
            'Applied Object-Oriented Programming principles to enhance entity development and maintainability.',
        ].join(' '),
        technologies: ['Java', 'Javadoc'],
        githubUrl: 'https://github.com/luut189/2DGame',
    },
];

export default function ProjectPage() {
    const [item, setItem] = useState(0);

    const handleManualNavigation = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setItem((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
        } else {
            setItem((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
        }
    };

    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className='flex w-full justify-center'>
                    <ProjectCard
                        title={projects[item].title}
                        imageUrl={projects[item].imageUrl}
                        description={projects[item].description}
                        technologies={projects[item].technologies}
                        githubUrl={projects[item].githubUrl}
                        projectUrl={projects[item].projectUrl}
                    />
                </motion.div>
            </AnimatePresence>

            <motion.div
                className='h-1 rounded bg-foreground'
                initial={{ width: '0%' }}
                animate={{ width: `${((item + 1) / projects.length) * 100}%` }}
                transition={{ duration: 0.5 }}
            />

            <div className='flex items-center justify-center gap-4'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handleManualNavigation('prev')}>
                    <ChevronLeft />
                </Button>
                <div className='rounded-md border p-2'>
                    {item + 1} / {projects.length}
                </div>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handleManualNavigation('next')}>
                    <ChevronRight />
                </Button>
            </div>
        </>
    );
}
