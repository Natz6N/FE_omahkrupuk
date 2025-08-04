import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "./Icons";
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // Filter out empty strings from split

  let currentLink = "";

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb font-semibold text-md flex items-center justify-center gap-2">
        <li className="breadcrumb-item flex items-center">
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <ChevronRight size="30px" />
        </li>
        {pathnames.map((name, index) => {
          currentLink += `/${name}`;

          const isLast = index === pathnames.length - 1;

          return (
            <>
              <li
                key={name}
                className={`breadcrumb-item ${isLast ? "active" : ""}`}
              >
                {isLast ? (
                  <>
                    <span>{name}</span>
                  </>
                ) : (
                  <Link to={currentLink}>{name}</Link>
                )}
              </li>
              {isLast ? (
                <></>
              ) : (
                <li>
                  <ChevronRight size="30px" />
                </li>
              )}
            </>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
