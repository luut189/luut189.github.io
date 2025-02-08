import { IntroBubble, Bio } from '@/components/bio';
import ContactsDisplay from '@/components/contacts';

export default function Homepage() {
    return (
        <>
            <Bio />
            <IntroBubble />
            <ContactsDisplay />
        </>
    );
}
