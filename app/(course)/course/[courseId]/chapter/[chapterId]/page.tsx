import { getChapter } from "@/actions/get-chapter";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CoursePurchaseButton } from "./_components/course-purchase-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import Link from "next/link";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyCodeButton } from "./_components/copy-code-button";
const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string; }
}) => {
    const session = await auth();
   
    const {
        chapter,
        course,
        attachments,
        nextChapter,
        userProgress,
        purchase,
        notionLink,
        githubLink,
        courseLanguage,
    } = await getChapter({
        userId: session?.user.id ?? '',
        courseId: params.courseId,
        chapterId: params.chapterId
    })

    if(!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;
    const links = [
        {
            href: `${course.githubLink}`,
            label: 'Github',
            icon: <FaGithub className="text-[#020817]"/>
        },
        {
            href: 'https://discord.gg/nizar',
            label: 'Discord',
            icon: <FaDiscord className='text-[#6466F1]'/>
        },
        {
            href: `${course.notionLink}`,
            label: 'Notion',
            icon: <RiNotionFill className="text-black"/>
        }
    ]

   
    
  return (
    <div className="w-full px-5 lg:pr-12 overflow-hidden mb-5">
        {isLocked ? (
            <div className="bg-zinc-900 relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-y-2">
                    
                    <CoursePurchaseButton
                        courseId={params.courseId}
                        price={course.price!}
                    />
                </div>
            </div>
        ) : (
        // This is the video player which will be shown when the video is not locked
        <div>
            <iframe
             src={`${chapter.vimeoVideo}`} 
             allow="autoplay; fullscreen; picture-in-picture; clipboard-write " 
             title="Video"
             className="w-full aspect-video rounded-[5px]"
             ></iframe>
        </div>
        )}
        <div className="mt-3 flex items-center justify-between pb-8 border-b border-b-slate-100/20">
            <h2 className="font-bold text-2xl mb-2">{chapter.title}</h2>
            <CourseProgressButton 
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
            />  
        </div>
        {chapter.code && chapter.code.trim().length > 0 && (
            <div> 
                  
                <h1 className="font-semibold text-xl pt-2 mb-4 ">Code</h1>
                <div className="bg-[#18181B] border-slate-100/10 rounded-[5px] rounded-t-[8px] border-2">
                    <div className="flex justify-end bg-[#6c7280] rounded-t-[5px] border-slate-200/10 pr-1">
                    <CopyCodeButton code={chapter.code}/>
                    </div>
                    <SyntaxHighlighter  language={`${course.courseLanguage}`} style={atomOneDark} wrapLongLines customStyle={{
                        backgroundColor: '#18181B',
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        fontSize: '14px',
                        padding: '15px',
                        paddingTop: '5px',
                        paddingBottom: '20px',
                        colorRendering: 'optimizeQuality',
                    }}>
                        
                        
                        {`${chapter.code}`}
                    </SyntaxHighlighter>
                </div>
            </div>
        )}
        <div className="flex items-center justify-center space-x-8 pt-8">
            {links.map((link, index) => (
                <Link href={link.href} key={link.href} className="bg-slate-100 w-[100px] py-2 rounded-[5px] hover:opacity-75 duration-300 border border-slate-100/20">
                    <div className="flex item-center justify-center">
                        <p className="text-center text-5xl">{link.icon}</p>
                    </div>
                    <p className="text-center text-[#2e2e2e] font-semibold mt-2">{link.label}</p>
                </Link>
            ))}     
        </div>
    </div>
  )
}

export default ChapterIdPage
