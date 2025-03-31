import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitHub } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

import { Image } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    imageUrl?: string;
    description: string[];
    technologies: string[];
    githubUrl?: string;
    projectUrl?: string;
    className?: string;
}

function ProjectCard({
    title,
    imageUrl,
    description,
    technologies,
    githubUrl,
    projectUrl,
    className,
}: ProjectCardProps) {
    return (
        <Card className={cn('overflow-hidden border-0 shadow-lg dark:shadow-slate-900', className)}>
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
                <div className='flex items-center gap-2'>
                    <p className='flex gap-2 text-xl font-bold'>{title}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    {description.map((desc) => (
                        <p>{desc}</p>
                    ))}
                </div>
            </CardContent>
            <CardFooter className='flex items-center justify-center'>
                <div className='mr-auto flex flex-row flex-wrap gap-2'>
                    {technologies.map((tech) => (
                        <div className='rounded-lg bg-primary/10 p-1'>{tech}</div>
                    ))}
                </div>
                <div className='flex flex-wrap justify-end gap-2'>
                    {projectUrl && (
                        <Button variant={'outline'}>
                            <a
                                href={projectUrl}
                                rel='noopener noreferrer'
                                target='_blank'
                                className='flex items-center justify-center gap-2'>
                                View Page
                                <div className='flex items-center justify-center rounded-xl bg-green-300 p-1'></div>
                            </a>
                        </Button>
                    )}
                    <Button className='ml-auto' asChild>
                        <a
                            href={githubUrl}
                            className='flex items-center justify-center'
                            rel='noopener noreferrer'
                            target='_blank'>
                            View Project <GitHub />
                        </a>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export { ProjectCard };
export type { ProjectCardProps };
