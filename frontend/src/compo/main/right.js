import React from "react";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import './right.css'
const Right=()=>{
    return(
        <>
        <div className="blogs">
            <div className="blog">
                <div className="hmain">

                
                <div className="heading">
                    <div className="head">

                    <label className="h">
                        The Overflow Blog
                        </label>
                    </div>
                    <div className="headtail">

                    
                        <p className="p1">
                        <ModeEditOutlineIcon/>    Great code isn’t enough. Developers need to brag about it (Ep. 571)
                        </p>
                
                        <p className="p2">
                        <ModeEditOutlineIcon/>  Keep 'em separated: Get better maintainability in web projects using the...
                        </p>
                        </div>
                </div>
                </div>
                <div className="heading2">
                    <div className="head">
                        <label className="h">
Featured on Meta
                        </label>
                        </div>
                        <div className="headtail">
                        <p> <BookmarksIcon/>
                          
New blog post from our CEO Prashanth: Community is the future of AI</p>
<p>
<BookmarksIcon/>
We are updating our Code of Conduct and we would like your feedback</p>
<p>
    <ChatBubbleOutlineIcon/>
Temporary policy: ChatGPT is banned
</p>
<p>
<ChatBubbleOutlineIcon/>
The [connect] tag is being burninated
</p>
<p>
<ChatBubbleOutlineIcon/>
Stack Overflow will be testing a title-drafting assistant, and we'd like your...</p>
<p>
<ChatBubbleOutlineIcon/>
We are graduating the "Related questions using Machine Learning" experiment
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Right