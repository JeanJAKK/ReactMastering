import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Star, CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function LessonContent({ lesson, isCompleted }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center",
            isCompleted 
              ? "bg-emerald-100 text-emerald-600"
              : "bg-indigo-100 text-indigo-600"
          )}>
            {isCompleted ? (
              <CheckCircle className="w-7 h-7" />
            ) : (
              <BookOpen className="w-7 h-7" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{lesson.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                {lesson.type === 'theory' ? 'Théorie' : 'Pratique'}
              </Badge>
              <span className="flex items-center gap-1 text-sm text-slate-500">
                <Star className="w-4 h-4 text-amber-500" />
                {lesson.points} points
              </span>
            </div>
          </div>
        </div>
        {isCompleted && (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Complété
          </Badge>
        )}
      </div>

      {/* Content */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-200">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-indigo-500 rounded-full" />
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 my-4 list-none pl-0">
                    {React.Children.map(children, child => {
                      if (React.isValidElement(child) && child.type === 'li') {
                        return React.cloneElement(child, {
                          className: "flex items-start gap-2 text-slate-600"
                        }, (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                            <span>{child.props.children}</span>
                          </>
                        ));
                      }
                      return child;
                    })}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-2 my-4 list-decimal pl-5">
                    {children}
                  </ol>
                ),
                li: ({ children, ordered }) => (
                  <li className="text-slate-600 leading-relaxed">
                    {children}
                  </li>
                ),
                code: ({ inline, className, children }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  
                  if (!inline && match) {
                    return (
                      <div className="relative group my-6">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 rounded-bl-lg text-xs text-slate-400 font-mono">
                          {match[1]}
                        </div>
                        <pre className="bg-slate-900 rounded-xl p-4 pt-10 overflow-x-auto">
                          <code className="text-sm text-slate-100 font-mono">
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  }
                  
                  return (
                    <code className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 bg-indigo-50/50 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-slate-800">
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
