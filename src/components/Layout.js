import React from 'react';

const Layout = ({title = 'Title', description = 'Description', className, children}) => (
    <div>
        <div className={className}>
            <h1 class="txt-blue">
                {title}
            </h1>
            <p className='lead'>
                {description}
            </p>
            <div >
            {children}
        </div>
        </div>
        
    </div>
);

export default Layout;