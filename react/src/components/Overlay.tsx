import React, { ReactElement, ReactNode, useEffect } from 'react';

interface OverlayProps {
    children: ReactElement<{ onClose: () => void }>;
    onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
        }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
        onClose();
        }
    };

    //god forgive me
    const childrenWithProps = React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { onClose }) : child,
    );

    return (
        <div className="overlay" onClick={handleClickOutside}>
        <div className="overlay-content">
            <button className="close-btn" onClick={onClose}>
            X
            </button>
            {childrenWithProps}
        </div>
        </div>
    );
};

export default Overlay;
