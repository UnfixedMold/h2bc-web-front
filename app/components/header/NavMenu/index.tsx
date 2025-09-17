import NavLinks from '../NavLinks';
import BurgerMenu from './BurgerMenu';

interface NavMenuProps {
  activePath: string;
  navClassName?: string;
  ulClassName?: string;
  linkClassName?: string;
}

export default function NavMenu({
  activePath,
  navClassName = '',
  ulClassName = '',
  linkClassName = '',
}: NavMenuProps) {
  return (
    <nav aria-label="Main navigation" className={navClassName}>
      <div className="hidden md:block">
        <NavLinks
          activePath={activePath}
          ulClassName={ulClassName}
          linkClassName={linkClassName}
        />
      </div>
      <BurgerMenu
        activePath={activePath}
        linkClassName={linkClassName}
      />
    </nav>
  );
}
