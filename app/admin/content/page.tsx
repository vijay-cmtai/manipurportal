"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Save, PlusCircle, Edit, Trash2 } from "lucide-react";
import { type FaqItem, type TutorialItem } from "@/lib/types";
import { FAQModal } from "@/components/admin/content/FAQModal";
import { TutorialModal } from "@/components/admin/content/TutorialModal";
import { DeleteConfirmationModal } from "@/components/admin/content/DeleteConfirmationModal";

const dummyFaqs: FaqItem[] = [
  {
    id: "faq1",
    question: "How do I start earning?",
    answer:
      "You start earning by completing your daily tasks, which include watching videos and subscribing to channels.",
  },
  {
    id: "faq2",
    question: "What is the platform contribution?",
    answer:
      "A small percentage of your monthly earnings is contributed back to the platform to cover operational costs.",
  },
];
const dummyTutorials: TutorialItem[] = [
  {
    id: "tut1",
    title: "How to Complete Your First Task",
    url: "https://youtube.com/watch?v=example1",
  },
  {
    id: "tut2",
    title: "Understanding Your Downline Income",
    url: "https://youtube.com/watch?v=example2",
  },
];

type ModalState = {
  type: "faq" | "tutorial" | "delete" | null;
  data?: FaqItem | TutorialItem | { id: string; name: string };
};

export default function ContentPage() {
  const [modalState, setModalState] = useState<ModalState>({ type: null });

  const handleOpenModal = (
    type: ModalState["type"],
    data?: ModalState["data"]
  ) => setModalState({ type, data });
  const handleCloseModal = () => setModalState({ type: null });

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Content Management
          </h1>
          <Button size="lg" className="w-full md:w-auto">
            <Save className="mr-2 h-4 w-4" /> Publish All Changes
          </Button>
        </div>

        <Tabs defaultValue="terms" className="w-full">
          {/* --- BADLAV: Tabs list is now scrollable on mobile --- */}
          <div className="relative w-full overflow-x-auto">
            <TabsList>
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="terms" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>Shown to users during signup.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your terms here..."
                  className="min-h-[300px] text-base"
                />
              </CardContent>
              <CardFooter>
                <Button>Save Terms</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="privacy" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>
                  Explain how you handle user data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your privacy policy here..."
                  className="min-h-[300px] text-base"
                />
              </CardContent>
              <CardFooter>
                <Button>Save Privacy Policy</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-4">
            <Card>
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Manage the FAQ section.</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal("faq")}
                  className="w-full md:w-auto"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add FAQ
                </Button>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {dummyFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline group">
                        <div className="flex w-full items-center justify-between pr-4">
                          <span>{faq.question}</span>
                          <div className="hidden group-hover:flex shrink-0 ml-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModal("faq", faq);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModal("delete", {
                                  id: faq.id,
                                  name: "FAQ item",
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="mt-4">
            <Card>
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Manage tutorial videos.</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal("tutorial")}
                  className="w-full md:w-auto"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Tutorial
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dummyTutorials.map((tut) => (
                    <div
                      key={tut.id}
                      className="flex flex-col items-start gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">{tut.title}</p>
                        <a
                          href={tut.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:underline break-all"
                        >
                          {tut.url}
                        </a>
                      </div>
                      <div className="shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenModal("tutorial", tut)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleOpenModal("delete", {
                              id: tut.id,
                              name: "tutorial",
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <FAQModal
        isOpen={modalState.type === "faq"}
        onClose={handleCloseModal}
        faq={modalState.data as FaqItem | null}
      />
      <TutorialModal
        isOpen={modalState.type === "tutorial"}
        onClose={handleCloseModal}
        tutorial={modalState.data as TutorialItem | null}
      />
      <DeleteConfirmationModal
        isOpen={modalState.type === "delete"}
        onClose={handleCloseModal}
        onConfirm={() => {
          console.log("Deleting", modalState.data);
          handleCloseModal();
        }}
        itemName={(modalState.data as any)?.name || "item"}
      />
    </>
  );
}
