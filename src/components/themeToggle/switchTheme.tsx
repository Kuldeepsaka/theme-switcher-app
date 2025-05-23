import { useSelector, useDispatch } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { toggleTheme } from '../../features/theme/themeSlice';
import { RootState } from '../../app/store';
import styles from './switchTheme.module.scss';

const ThemeToggleButton = ({ onClick }: { onClick?: () => void }) => {
    const theme = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleTheme());
        if (onClick) onClick(); // Trigger the parent animation handler
    };

    return (
        <button
            className={styles.themeToggleBtn}
            onClick={handleClick}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};

export default ThemeToggleButton;
