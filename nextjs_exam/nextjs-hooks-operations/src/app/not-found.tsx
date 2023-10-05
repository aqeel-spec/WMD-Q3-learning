import Link from 'next/link'
import styles from './404.module.css';
import { headers } from 'next/headers';


export default async function NotFound(pathname : string) {


    return (
        <>
            <div className={styles.container}>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, there is nothing to see here</p>
                <p>
                    Use the search box or the links below to explore our amazing
                    application
                </p>
                <input
                    type='search'
                    className={styles.searchBox}
                    placeholder='Just a dummy search box...'
                />
                <div className={styles.links}>
                    <Link href='/hira' className={styles.link}>
                        Mam Hira
                    </Link>
                    <Link href='/zia' className={styles.link}>
                        Pro. Zia khan
                    </Link>
                    <Link href='/zeeshan' className={styles.link}>
                        Sir Zeeshan Hanif
                    </Link>
                    <Link href='/' className={styles.link}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </>
    )
}