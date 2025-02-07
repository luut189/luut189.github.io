import { IntroBubble, Bio } from '@/components/bio';
import ContactsDisplay from '@/components/contacts';

export default function Homepage() {
    return (
        <div className='flex w-2/3 flex-col gap-10 p-4'>
            <Bio />
            <IntroBubble />
            <ContactsDisplay />
        </div>
    );
}
