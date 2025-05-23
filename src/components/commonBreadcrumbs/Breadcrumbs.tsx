// src/components/common/Breadcrumbs.tsx
import React, { useRef } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Breadcrumbs = () => {


    const breadcrumbRef = useRef(null);

    useGSAP(() => {
        gsap.from(breadcrumbRef.current, { opacity: 0, y: -10, duration: 0.6 });
    }, []);


    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div ref={breadcrumbRef} className={styles.breadcrumbContainer}>
            <Breadcrumb className={styles.breadcrumb}>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className={styles.breadcrumbItem}>
                    Home
                </Breadcrumb.Item>

                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const label = name.replace(/-/g, " ");

                    return isLast ? (
                        <Breadcrumb.Item key={name} active className={styles.active}>
                            {label}
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item
                            key={name}
                            linkAs={Link}
                            linkProps={{ to: routeTo }}
                            className={styles.breadcrumbItem}
                        >
                            {label}
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        </div>
    );
};

export default Breadcrumbs;
