/** Who is chatting. Name is a nickname; the PIN only separates one person's notes from another's. */
export interface Profile {
  name: string;
  pin: string;
  week: number | null;
}

/** One memory as returned by Walrus Memory (no invented fields). */
export interface MemoryItem {
  blobId: string;
  text: string;
  createdAt?: string;
}

export interface RecordedNote {
  /** The note LoveChild wrote down from what she said. */
  note: string;
  /** Real Walrus blob id once the write has finished. */
  blobId?: string;
  status: 'saved' | 'pending' | 'skipped' | 'failed';
  error?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recalled?: MemoryItem[];
  recorded?: RecordedNote;
  isError?: boolean;
}
