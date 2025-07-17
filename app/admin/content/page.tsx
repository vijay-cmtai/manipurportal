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

// Import Modals
import { FAQModal } from "@/components/admin/content/FAQModal";
import { TutorialModal } from "@/components/admin/content/TutorialModal";
import { DeleteConfirmationModal } from "@/components/admin/content/DeleteConfirmationModal";

// --- DUMMY DATA ---
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
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Content Management
          </h1>
          <Button size="lg">
            <Save className="mr-2 h-4 w-4" />
            Publish All Changes
          </Button>
        </div>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="terms">Terms</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          </TabsList>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>
                  This content is shown to users during signup and in their
                  profile.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your terms here..."
                  className="min-h-[400px] text-base"
                />
              </CardContent>
              <CardFooter>
                <Button>Save Terms</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
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
                  className="min-h-[400px] text-base"
                />
              </CardContent>
              <CardFooter>
                <Button>Save Privacy Policy</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Manage the FAQ section shown on the help page.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal("faq")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {dummyFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex justify-between items-center w-full pr-4">
                          <span>{faq.question}</span>
                          <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

          <TabsContent value="tutorials">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>
                    Manage the tutorial videos available to users.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal("tutorial")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Tutorial
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dummyTutorials.map((tut) => (
                    <div
                      key={tut.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{tut.title}</p>
                        <a
                          href={tut.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {tut.url}
                        </a>
                      </div>
                      <div className="space-x-2">
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
                              name: "tutorial video",
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

      {/* Modals */}
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
