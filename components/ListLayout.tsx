import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

const ListLayout = (props: Props) => {
  const { children } = props;

  return <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{children}</div>
}

export default ListLayout;
