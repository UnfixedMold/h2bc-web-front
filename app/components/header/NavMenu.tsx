"use client";
import NavLinks from "./NavLinks";
import BurgerMenu from "./BurgerMenu";

interface NavMenuProps {
  activePath: string;
  navClassName?: string;
  ulClassName?: string;
  linkClassName?: string;
  activeLinkClassName?: string;
}

export default function NavMenu({
  activePath,
  navClassName = '',
  ulClassName = '',
  linkClassName = '',
  activeLinkClassName = '',
  
}: NavMenuProps) {
  return (
    <nav aria-label="Main navigation" className={navClassName}>
      {/* Desktop menu */}
      <div className="hidden md:block">
        <NavLinks
          activePath={activePath}
          ulClassName={ulClassName}
          linkClassName={linkClassName}
          activeLinkClassName={activeLinkClassName}
        />
      </div>

      {/* Mobile burger */}
      <BurgerMenu
        activePath={activePath}
        linkClassName={linkClassName}
        activeLinkClassName={activeLinkClassName}
      />
    </nav>
  );
}
