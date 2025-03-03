import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
  HandCoins,
  BookUser,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
  {
    url: "/deudas",
    icon: <HandCoins />,
    label: "Deudas",
  },
  {
    url: "/contacts",
    icon: <BookUser />,
    label: "contactos",
  },
  {
    url: "/rollos",
    icon: <BookUser />,
    label: "rollos",
  },
];
