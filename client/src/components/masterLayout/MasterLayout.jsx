import React, { Fragment, useRef } from 'react';
import { Accordion, Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
    AiOutlineBank,
    AiOutlineDashboard,
    AiOutlineHome, AiOutlineInfoCircle,
    AiOutlineLogout,
    AiOutlineMenu, AiOutlinePicture,
    AiOutlineUser
} from 'react-icons/ai';
import { BsBox, BsCircle, BsFillPeopleFill, BsFillQuestionCircleFill, BsPeople } from 'react-icons/bs';
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import logo from "../../assets/images/plainb-logo.svg"
import { getUserDetails, removeSessions } from "../../utility/SessionHelper";
import { Toaster } from "react-hot-toast";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";

const MasterLayout = (props) => {
    let contentRef, sideNavRef, topNavRef = useRef();

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        let topNav = topNavRef;
        if (sideNav.classList.contains('side-nav-open')) {
            sideNav.classList.add('side-nav-close');
            sideNav.classList.remove('side-nav-open');
            content.classList.add('content-expand');
            content.classList.remove('content');
            topNav.classList.remove('top-nav-open');
            topNav.classList.add('top-nav-close');
        } else {
            sideNav.classList.remove('side-nav-close');
            sideNav.classList.add('side-nav-open');
            content.classList.remove('content-expand');
            content.classList.add('content');
            topNav.classList.add('top-nav-open');
            topNav.classList.remove('top-nav-close');
        }
    };

    const isSidebarAccordionActive = () => {
        let urlList = [];
        sidebarItems.map((item) => {
            urlList.push(
                item.subMenu.map((subItem) => {
                    return subItem?.url;
                })
            );
        });
        return urlList.findIndex((items) =>
            items.includes(window.location.pathname)
        );
    };

    const sidebarItems = [
        {
            title: 'Dashboard',
            icon: <RiDashboardLine className="side-bar-item-icon" />,
            url: '/Dashboard',
            subMenu: [],
        },
        {
            title: 'Products',
            icon: <BsPeople className="side-bar-item-icon" />,
            url: '/products',
            subMenu: [
                {
                    title: 'Products',
                    icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
                    url: '/products',
                },
                {
                    title: 'Student List',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/StudentListPage',
                },
                {
                    title: 'Pending Student',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/PendingStudent',
                },
            ],
        },
        {


            title: 'Balance',


            icon: <HiOutlineCurrencyBangladeshi className="side-bar-item-icon" />,
            url: '/Balance',
            subMenu: [
                {
                    title: 'Add Balance',
                    icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
                    url: '/BalanceCreateUpdatePage',
                },
                {
                    title: 'Balance List',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/BalanceListPage',
                },
            ],
        },
        {
            title: 'Gallery',
            icon: <AiOutlineDashboard className="side-bar-item-icon" />,
            url: '',
            subMenu: [
                {
                    title: 'Gallery',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/upload-gallery',
                },
                {
                    title: 'Gallery List',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/display-gallery',
                }]
        },
        {
            title: 'Notice',
            icon: <AiOutlineHome className="side-bar-item-icon" />,
            url: '',
            subMenu: [
                {
                    title: 'Notice',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/upload-notice',
                },
                {
                    title: 'Notice list',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/display-notice',
                },
            ]
        },
        {
            title: 'Carousel',
            icon: <AiOutlinePicture className="side-bar-item-icon" />,
            url: '',
            subMenu: [
                {
                    title: 'Carousel',
                    icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
                    url: '/upload-carousel',
                },
                {
                    title: 'Carousel List',
                    icon: (
                        <AiOutlineUnorderedList size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/display-carousel',
                },
            ]
        },
        {
            title: 'Admin Options',
            icon: <AiOutlineBank className="side-bar-item-icon" />,
            url: '',
            subMenu: [
                {
                    title: 'Upload Logo',
                    icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
                    url: '/upload-logo',
                },
                {
                    title: 'Logo',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/display-logo',
                }

            ],
        },
        {
            title: 'Admin Info',
            icon: <BsBox className="side-bar-item-icon" />,
            url: '',
            subMenu: [
                {
                    title: 'Upload Info',
                    icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
                    url: '/upload-info',
                },
                {
                    title: 'Info List',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/display-info',
                },
                {
                    title: 'Upload Footer',
                    icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
                    url: '/upload-footer',
                },
                {
                    title: 'Footer List',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/display-footer',
                },
            ],
        }, {
            title: 'Why IPH',
            icon: <BsFillQuestionCircleFill size={16} className="side-bar-item-icon" />,
            url: '',
            subMenu: [
                {
                    title: 'Why IPH',
                    icon: <AiOutlineInfoCircle size={16} className="side-bar-subitem-icon" />,
                    url: '/upload-whyiph',
                },
                {
                    title: 'Why IPH List',
                    icon: (
                        <BsCircle size={16} className="side-bar-subitem-icon" />
                    ),
                    url: '/display-whyiph',
                },
            ]
        },
        {
            title: 'Subscriber',
            icon: <BsFillPeopleFill className="side-bar-item-icon" />,
            url: '',
            subMenu: [
                {
                    title: 'Subscriber List',
                    icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
                    url: '/display-subscriber',
                },
            ],
        }

    ];

    const onLogout = () => {
        removeSessions();
    }
    return (
        <Fragment>
            <Navbar className="fixed-top px-0 ">
                <Container fluid={true}>
                    <Toaster />
                    <Navbar.Brand>
                        <div ref={(div) => {
                            topNavRef = div
                        }} className="top-nav-open">
                            <h4 className="text-white m-0 p-0"><a onClick={MenuBarClickHandler}><AiOutlineMenu /></a>
                            </h4>
                        </div>
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex align-items-center">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={getUserDetails()['photo']} alt="" />
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={getUserDetails()['photo']} alt="" />
                                    <h6>{getUserDetails()['firstName']}</h6>
                                    <hr className="user-dropdown-divider  p-0" />
                                </div>
                                <NavLink to="/admin-profile" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </Container>
            </Navbar>

            <div ref={(div) => {
                sideNavRef = div
            }} className="side-nav-open border-radius-0 card">
                <NavLink to="/Dashboard" end className="d-flex justify-content-center sticky-top bg-white">
                    <img src={logo} className="logo" />
                </NavLink>

                <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
                    {sidebarItems.map((item, index) => {
                        return item.subMenu.length !== 0 ? (
                            <Accordion.Item
                                key={index.toString()}
                                eventKey={`${index}`}
                                className="mt-2"
                            >
                                <Accordion.Header>
                                    <div className="side-bar-item">
                                        {item.icon}
                                        <span className="side-bar-item-caption">
                                            {item.title}
                                        </span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {item.subMenu.map((subItem, index) => (
                                        <NavLink
                                            key={index.toString()}
                                            className={(navData) =>
                                                navData.isActive
                                                    ? 'side-bar-subitem-active side-bar-subitem '
                                                    : 'side-bar-subitem'
                                            }
                                            to={subItem?.url}
                                            end
                                        >
                                            {subItem?.icon}
                                            <span className="side-bar-subitem-caption">
                                                {subItem?.title}
                                            </span>
                                        </NavLink>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        ) : (
                            <NavLink
                                className={(navData) =>
                                    navData.isActive
                                        ? 'side-bar-item-active side-bar-item mt-2'
                                        : 'side-bar-item mt-2'
                                }
                                to={'/Dashboard'}
                                end
                            >
                                {item.icon}
                                <span className="side-bar-item-caption">
                                    {item.title}
                                </span>
                            </NavLink>
                        );
                    })}
                </Accordion>
            </div>


            <div ref={(div) => (contentRef = div)} className="content">
                {props.children}
            </div>
        </Fragment>
    );
};

export default MasterLayout;