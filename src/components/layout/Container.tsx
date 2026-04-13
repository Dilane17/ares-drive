import { cn } from '@/lib/utils/cn';

export interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn('max-w-[1616px] mx-auto px-8 w-full', className)}>
            {children}
        </div>
    );
}

export default Container;

/*
USAGE:
  <Container>
    <HeroSection />
  </Container>
  <Container className="py-16">
    <CarGrid />
  </Container>
*/
