/*
 * Created on 18.01.17.
 */

"use strict";

import React from 'react'
import Editor from '../../components/announcementEditor';
import News from '../../components/news';
import Announcements from '../../components/announcements';
import '../../css/base.css'
import '../../css/main.css'
import '../../css/background.css'

const MainView = () => {
    return (
        <main className="main">
            <section className="articles">
                <Editor />
                <Announcements />
            </section>
            <News />
        </main>
    );
}

export default MainView
