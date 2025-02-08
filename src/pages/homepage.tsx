import { IntroBubble, Bio } from '@/components/profile/bio';
import ContactsDisplay from '@/components/profile/contacts';

export default function Homepage() {
    return (
        <>
            <Bio />
            <IntroBubble />
            <ContactsDisplay />
        </>
    );
}
