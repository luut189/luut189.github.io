export default function Footer() {
    return (
        <footer className='flex items-center justify-center text-muted-foreground p-4 text-xs'>
            &copy; {new Date().getFullYear()} Tuong Luu. All Rights Reserved.
        </footer>
    );
}
