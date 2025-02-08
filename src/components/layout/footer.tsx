export default function Footer() {
    return (
        <footer className='flex items-center justify-center p-4 text-xs text-muted-foreground'>
            &copy; {new Date().getFullYear()} Tuong Luu. All Rights Reserved.
        </footer>
    );
}
