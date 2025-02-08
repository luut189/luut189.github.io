import { Button } from '@/components/ui/button';

export default function PageNotFound() {
    return (
        <div className='flex flex-col gap-4 text-center'>
            <div className='space-y-3'>
                <h1 className='text-4xl font-bold tracking-tighter transition-transform hover:scale-110 sm:text-5xl'>
                    404
                </h1>
                <p className='text-muted-foreground'>
                    Looks like you've ventured into the unknown digital realm.
                </p>
            </div>
            <Button className='mx-auto w-fit' asChild>
                <a href='/'>Return to homepage</a>
            </Button>
        </div>
    );
}
