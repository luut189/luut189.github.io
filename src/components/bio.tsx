import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function IntroBubble() {
    return (
        <div className='m-auto flex w-full items-center justify-center rounded-xl border p-4 text-center text-xl shadow-md dark:shadow-slate-900'>
            Hello, I am a sophomore student at University of Waterloo with development hobbies!
        </div>
    );
}

function Bio() {
    return (
        <div className='flex w-full items-center justify-center gap-10'>
            <div className='flex flex-col gap-2'>
                <div className='text-4xl font-bold'>Tuong Luu</div>
                <div className='text-2xl text-muted-foreground'>Computational Mathematics</div>
            </div>

            <Avatar className='h-32 w-32 border-2'>
                <AvatarImage src='https://github.com/luut189.png' />
                <AvatarFallback>Tuong's Avatar</AvatarFallback>
            </Avatar>
        </div>
    );
}

export { IntroBubble, Bio };
