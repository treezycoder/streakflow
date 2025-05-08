import { FaLinkedin, FaGithub, FaWhatsapp, FaGlobe } from "react-icons/fa";

type FooterProps = {
  name?: string;
  socialLinks?: {
    whatsapp?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  textColor?: string;
  hoverColor?: string;
  iconSize?: number;
  layout?: "vertical" | "horizontal" | "auto";
};

const Footer: React.FC<FooterProps> = ({
  name = "Tresor Ngahame",
  socialLinks = {
    whatsapp: "#",
    linkedin: "#",
    github: "#",
    portfolio: "#",
  },
  textColor = "text-gray-800 dark:text-gray-200",
  hoverColor = "hover:text-orange-500",
  iconSize = 24,
  layout = "auto",
}) => {
  const year = new Date().getFullYear();

  const layoutClass =
    layout === "horizontal"
      ? "flex-row"
      : layout === "vertical"
      ? "flex-col"
      : "flex-col sm:flex-row";

  return (
    <footer className={`py-6 ${textColor}`}>
      <div
        className={`container mx-auto px-4 flex ${layoutClass} justify-between items-center gap-4 text-center sm:text-left`}
      >
        <div>
          <p className="text-lg font-inter font-semibold">{name}</p>
          <p className="text-sm">&copy; {year} All rights reserved.</p>
        </div>

        <div className="flex gap-4">
          {socialLinks.whatsapp && (
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${hoverColor} transition`}
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={iconSize} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${hoverColor} transition`}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={iconSize} />
            </a>
          )}
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${hoverColor} transition`}
              aria-label="GitHub"
            >
              <FaGithub size={iconSize} />
            </a>
          )}
          {socialLinks.portfolio && (
            <a
              href={socialLinks.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className={`${hoverColor} transition`}
              aria-label="Portfolio"
            >
              <FaGlobe size={iconSize} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
