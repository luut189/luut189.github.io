import { ProjectCard, ProjectCardProps } from '@/components/project-card';

const projects: ProjectCardProps[] = [
    {
        title: 'Anime Discussion Forum',
        imageUrl: '/projects/anime-discuss.png',
        description:
            'A MERN stack-powered anime forum where fans can discuss, track, and pin favorite anime. It features daily anime highlights, checklists, watch lists, and interactive discussions, all in a sleek and responsive design.',
        technologies: ['MongoDB', 'Express', 'Node.js', 'React'],
        githubUrl: 'https://github.com/luut189/anime-discuss',
    },
    {
        title: 'Tetris Clone (Biquadris)',
        imageUrl: '/projects/biquadris.png',
        description:
            'A Tetris game developed using C++ with a focus on Software Development Lifecycle (SDLC), including planning, UML modeling, testing, and deployment. Implemented Object-Oriented Programming (OOP) principles with design patterns like Observer, Decorator, and Factory for maintainability.',
        technologies: ['C++', 'Make', 'Valgrind'],
        githubUrl: 'https://github.com/ntung110/cs246-f24-biquadris',
    },
    {
        title: '2D Game',
        imageUrl: '/projects/2d-game.png',
        description:
            'A top-down 2D game built in Java, demonstrating performance optimizations for handling over 10,000 entities. Applied Object-Oriented Programming principles to enhance entity development and maintainability.',
        technologies: ['Java', 'Javadoc'],
        githubUrl: 'https://github.com/luut189/2DGame',
    },
];

export default function ProjectPage() {
    return (
        <>
            {projects.map((project) => (
                <ProjectCard
                    title={project.title}
                    imageUrl={project.imageUrl}
                    description={project.description}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                />
            ))}
        </>
    );
}
