export type UserRole = "crianca" | "responsavel" | "professor";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          points: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          points?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          points?: number;
          updated_at?: string;
        };
      };
      children: {
        Row: {
          id: string;
          profile_id: string;
          nickname: string;
          grade_label: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          nickname: string;
          grade_label?: string | null;
          created_at?: string;
        };
        Update: {
          nickname?: string;
          grade_label?: string | null;
        };
      };
      responsible_children: {
        Row: {
          id: string;
          responsible_id: string;
          child_id: string;
          status: "pending" | "active" | "blocked";
          created_at: string;
        };
        Insert: {
          id?: string;
          responsible_id: string;
          child_id: string;
          status?: "pending" | "active" | "blocked";
          created_at?: string;
        };
        Update: {
          status?: "pending" | "active" | "blocked";
        };
      };
      teachers: {
        Row: {
          id: string;
          profile_id: string;
          area: string;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          area: string;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          area?: string;
          bio?: string | null;
        };
      };
      classes: {
        Row: {
          id: string;
          teacher_id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
        };
      };
      class_students: {
        Row: {
          id: string;
          class_id: string;
          child_id: string;
          status: "active" | "invited" | "removed";
          created_at: string;
        };
        Insert: {
          id?: string;
          class_id: string;
          child_id: string;
          status?: "active" | "invited" | "removed";
          created_at?: string;
        };
        Update: {
          status?: "active" | "invited" | "removed";
        };
      };
      digital_adventures: {
        Row: {
          id: string;
          title: string;
          description: string;
          level: string;
          icon: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          level: string;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          level?: string;
          icon?: string | null;
          sort_order?: number;
        };
      };
      missions: {
        Row: {
          id: string;
          adventure_id: string | null;
          title: string;
          description: string;
          category: string;
          duration_minutes: number;
          difficulty: string;
          content: string | null;
          safety_tip: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          adventure_id?: string | null;
          title: string;
          description: string;
          category: string;
          duration_minutes?: number;
          difficulty: string;
          content?: string | null;
          safety_tip?: string | null;
          created_at?: string;
        };
        Update: {
          adventure_id?: string | null;
          title?: string;
          description?: string;
          category?: string;
          duration_minutes?: number;
          difficulty?: string;
          content?: string | null;
          safety_tip?: string | null;
        };
      };
      challenges: {
        Row: {
          id: string;
          mission_id: string | null;
          title: string;
          question: string;
          challenge_type: string;
          options: Json;
          correct_answer: string;
          explanation: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          mission_id?: string | null;
          title: string;
          question: string;
          challenge_type: string;
          options?: Json;
          correct_answer: string;
          explanation: string;
          created_at?: string;
        };
        Update: {
          mission_id?: string | null;
          title?: string;
          question?: string;
          challenge_type?: string;
          options?: Json;
          correct_answer?: string;
          explanation?: string;
        };
      };
      challenge_answers: {
        Row: {
          id: string;
          challenge_id: string;
          user_id: string;
          answer: string;
          is_correct: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          challenge_id: string;
          user_id: string;
          answer: string;
          is_correct: boolean;
          created_at?: string;
        };
        Update: {
          answer?: string;
          is_correct?: boolean;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          adventure_id: string | null;
          mission_id: string | null;
          status: "not_started" | "in_progress" | "completed";
          progress_percent: number;
          stars: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          adventure_id?: string | null;
          mission_id?: string | null;
          status?: "not_started" | "in_progress" | "completed";
          progress_percent?: number;
          stars?: number;
          updated_at?: string;
        };
        Update: {
          status?: "not_started" | "in_progress" | "completed";
          progress_percent?: number;
          stars?: number;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon: string;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          icon?: string;
        };
      };
      ranking: {
        Row: {
          id: string;
          user_id: string;
          stars: number;
          level: string;
          medals: Json;
          progress_percent: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stars?: number;
          level?: string;
          medals?: Json;
          progress_percent?: number;
          updated_at?: string;
        };
        Update: {
          stars?: number;
          level?: string;
          medals?: Json;
          progress_percent?: number;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          safety_flag: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          safety_flag?: string | null;
          created_at?: string;
        };
        Update: {
          safety_flag?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
