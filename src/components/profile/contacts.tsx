import { GitHub, Instagram } from '@/components/ui/icons';
import { Mail } from 'lucide-react';

const iconClassName = 'h-8 w-8';

const contacts = [
    {
        display: <GitHub className={iconClassName} />,
        href: 'https://github.com/luut189',
    },
    {
        display: <Instagram className={iconClassName} />,
        href: 'https://www.instagram.com/_kyzeeeeel/',
    },
    {
        display: <Mail className={iconClassName} />,
        href: 'mailto:tm2luu@uwaterloo.ca',
    },
];

export default function ContactsDisplay() {
    return (
        <div className='flex items-center justify-center gap-8'>
            {contacts.map((contact, idx) => (
                <a
                    key={idx}
                    className='transition-colors hover:text-muted-foreground'
                    rel='noopener noreferrer'
                    target='_blank'
                    href={contact.href}>
                    {contact.display}
                </a>
            ))}
        </div>
    );
}
