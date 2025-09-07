-- Support Messages Table
CREATE TABLE IF NOT EXISTS public.support_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support Replies Table
CREATE TABLE IF NOT EXISTS public.support_replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    support_message_id UUID REFERENCES public.support_messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_admin_reply BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_support_messages_user_id ON public.support_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_status ON public.support_messages(status);
CREATE INDEX IF NOT EXISTS idx_support_messages_created_at ON public.support_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_replies_support_message_id ON public.support_replies(support_message_id);
CREATE INDEX IF NOT EXISTS idx_support_replies_created_at ON public.support_replies(created_at DESC);

-- RLS Policies
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_replies ENABLE ROW LEVEL SECURITY;

-- Track last seen for support center per user (for unread badges)
CREATE TABLE IF NOT EXISTS public.support_last_seen (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT '1970-01-01T00:00:00Z'
);

ALTER TABLE public.support_last_seen ENABLE ROW LEVEL SECURITY;

-- Users can only see their own support messages
CREATE POLICY "Users can view own support messages" ON public.support_messages
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own support messages
CREATE POLICY "Users can insert own support messages" ON public.support_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own support messages (only status to closed)
CREATE POLICY "Users can update own support messages" ON public.support_messages
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can see all support messages
CREATE POLICY "Admins can view all support messages" ON public.support_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can update all support messages
CREATE POLICY "Admins can update all support messages" ON public.support_messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Users can view replies to their support messages
CREATE POLICY "Users can view replies to own messages" ON public.support_replies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.support_messages 
            WHERE id = support_message_id AND user_id = auth.uid()
        )
    );

-- Users can insert replies to their support messages
CREATE POLICY "Users can insert replies to own messages" ON public.support_replies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.support_messages 
            WHERE id = support_message_id AND user_id = auth.uid()
        )
    );

-- Admins can view all replies
CREATE POLICY "Admins can view all replies" ON public.support_replies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can insert replies to any support message
CREATE POLICY "Admins can insert replies to any message" ON public.support_replies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_support_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_support_messages_updated_at
    BEFORE UPDATE ON public.support_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_support_messages_updated_at();
