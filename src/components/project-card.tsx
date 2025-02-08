import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitHub } from '@/components/ui/icons';
import { Image } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    imageUrl: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    projectUrl?: string;
}

function ProjectCard({ title, imageUrl, description, technologies, githubUrl }: ProjectCardProps) {
    return (
        <Card className='overflow-hidden border-0 shadow-lg dark:shadow-slate-900'>
            <CardHeader className='flex items-center justify-center'>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        className='relative w-full rounded object-cover object-center'
                        alt={title}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div className='flex min-h-48 w-full items-center justify-center rounded border shadow-md dark:shadow-slate-900'>
                        <Image size={48} />
                    </div>
                )}
            </CardHeader>
            <CardContent className='flex flex-col justify-center gap-2'>
                <p className='flex gap-2 text-xl font-bold'>{title}</p>
                <div>{description}</div>
            </CardContent>
            <CardFooter className='flex items-center justify-center'>
                <div className='mr-auto flex flex-row flex-wrap gap-2'>
                    {technologies.map((tech) => (
                        <div className='rounded-lg border bg-secondary p-1'>{tech}</div>
                    ))}
                </div>
                <Button className='ml-auto' asChild>
                    <a href={githubUrl} className='flex items-center justify-center'>
                        View Project <GitHub />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}

export { ProjectCard };
export type { ProjectCardProps };
