import { LucideIcon, Mail, MapPin, Phone } from "lucide-react";
import { FC } from "react";
import { Card } from "../ui/card";

function ContactDetailsSection() {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 py-18 my-20 ">
      <ContactDetailCard
        icon={Mail}
        title="Email"
        description="Notre équipe sympathique est là pour vous aider."
        info="contact@loclocs.com"
      />
      <ContactDetailCard
        icon={MapPin}
        title="Office"
        description="Venez nous saluer au siège de notre bureau."
        info="100 Smith Street Collingwood VIC 3066 AU"
      />
      <ContactDetailCard
        icon={Phone}
        title="Phone"
        description="Du lundi au vendredi de 8h à 17h."
        info="+1 (555) 000-0000"
      />
    </div>
  );
}

export default ContactDetailsSection;

interface ContactDetailCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  info: string;
}

const ContactDetailCard: FC<ContactDetailCardProps> = ({
  icon: Icon,
  title,
  description,
  info,
}) => {
  return (
    <Card className="flex flex-col items-center space-y-0 text-center py-0">
      <div className="h-12 w-12 p-3 bg-primary/10 rounded-full text-primary">
        <Icon className="text-primary" size={25} />
      </div>

      <div className="space-y-2">
        <h3 className=" font-bold text-lg ">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>

      <p className="text-primary text-lg font-bold">{info}</p>
    </Card>
  );
};
