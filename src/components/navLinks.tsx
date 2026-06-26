import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Button } from './ui/button';

export default function NavLinks() {
  return (
    <nav>
      <Button asChild variant={'ghost'}>
        <Link href={'/'}>Home</Link>
      </Button>
      <Button asChild variant={'ghost'}>
        <Link href={'/shop'}>Shop</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer" variant="ghost">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-4">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={'/cart'}>Cart</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
