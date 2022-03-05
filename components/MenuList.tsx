import React from "react";
import { useSelector } from "react-redux";
import { MenuItem } from "store/MenuSlice";
import NextLink from "next/link";
import Image from "next/image";

function MenuList() {
  const menuItems = useSelector<any, MenuItem[]>((state) => state.menu.items);
  return (
    <>
      <div className="h-24" />
      <div className="fixed bottom-0 left-0 right-0 flex h-24 overflow-y-scroll bg-gradient-to-b from-orange-300 to-orange-400">
        {menuItems.map((item) => (
          <NextLink href={`/recipe/${item.id}`} passHref key={item.id}>
            <a>
              <div
                key={item.id}
                className="relative m-2 flex h-20 w-20 items-center justify-center border-2 border-orange-500"
              >
                <Image src={item.image} alt={item.title} layout="fill" />
                <h4 className="absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center">
                  <div className="w-full bg-gray-700 text-center mix-blend-hard-light">
                    <span className="text-orange-300">{item.title}</span>
                  </div>
                </h4>
              </div>
            </a>
          </NextLink>
        ))}
      </div>
    </>
  );
}

export default MenuList;
