import { Signature } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const routes = [
    { display: 'About', href: '/about', external: false },
    { display: 'Projects', href: '/projects', external: false },
    { display: 'Resume', href: '/resume.pdf', external: true },
];

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className='flex p-4'>
            <div
                className='flex cursor-pointer items-center gap-2 text-xl font-bold'
                onClick={() => navigate('/')}>
                <Signature /> T's
            </div>
            <div className='ml-auto flex items-center justify-center'>
                {routes.map((route, idx) =>
                    route.external ? (
                        <Button key={idx} variant={'link'} className='text-lg' asChild>
                            <a href={route.href} rel='noopener noreferrer'>
                                {route.display}
                            </a>
                        </Button>
                    ) : (
                        <Button
                            key={idx}
                            variant={'link'}
                            className='text-lg'
                            onClick={() => navigate(route.href)}>
                            {route.display}
                        </Button>
                    ),
                )}
            </div>
        </nav>
    );
}
