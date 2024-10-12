import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Reply as ReplyIcon,
} from '@mui/icons-material';

// my project
import TextEditor from '@/components/TextEditor';

interface CommentData {
  username: string;
  avatar: string;
  comment: string;
  likes: number;
  timestamp: string;
}

interface CommentInputProps {
  onSubmit?: (comment: string) => void;
  placeholder?: string;
  buttonText?: string;
  init?: string;
}

interface CommentItemProps extends CommentData {
  deep?: number;
}


const initialComments: CommentData[] = [
  {
    username: 'John Doe',
    avatar: '/placeholder.svg?height=40&width=40',
    comment:
      'This is an amazing video! I learned so much from it. Keep up the great work!',
    likes: 42,
    timestamp: '2 ngày trước',
  },
  {
    username: 'Jane Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    comment:
      'I have a question about the topic at 3:24. Could you please elaborate on that part?',
    likes: 15,
    timestamp: '1 ngày trước',
  },
  {
    username: 'Alex Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    comment:
      'Your explanations are always so clear and easy to follow. Thanks for sharing your knowledge!',
    likes: 78,
    timestamp: '3 giờ trước',
  },
  {
    username: 'Emily Brown',
    avatar: '/placeholder.svg?height=40&width=40',
    comment: 'This is exactly what I was looking for. Thanks a lot!',
    likes: 10,
    timestamp: '5 giờ trước',
  },
  {
    username: 'Michael Green',
    avatar: '/placeholder.svg?height=40&width=40',
    comment:
      "I disagree with some points made in the video, but overall, it's very informative.",
    likes: 5,
    timestamp: '8 giờ trước',
  },
];


export default function Comment() {
  const [comments, setComments] = useState<CommentData[]>(initialComments);

  const handleComment = (comment: string)=> {
    setComments([
      {
        username: 'Duong Duc Phuong',
        avatar: '/placeholder.svg?height=40&width=40',
        comment: comment,
        likes: 0,
        timestamp: 'a few seconds ago',
      },
      ...comments,
    ])
  }
  return (
    <Box maxWidth="md" margin="auto" padding={2}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Bình luận
      </Typography>
      <CommentInput
        onSubmit={handleComment}
        buttonText='Bình luận'
      />
      <Stack spacing={3} mt={4}>
        {comments.map((c: any, index: number) => (
          <CommentItem
            key={index}
            username={c.username}
            avatar={c.avatar}
            comment={c.comment}
            likes={c.likes}
            timestamp={c.timestamp}
            deep={c.deep}
          />
        ))}
      </Stack>
    </Box>
  );
}

function CommentInput({
  onSubmit,
  placeholder = 'Add a comment...',
  buttonText = 'Bình luận',
  init = '',
}: CommentInputProps) {
  const [comment, setComment] = useState<string>('');
  const theme = useTheme();

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit && onSubmit(comment);
      setComment('');
    }
  };

  return (
    <Box display="flex" alignItems="flex-start">
      <Avatar
        sx={{
          marginRight: 2,
          width: 40,
          height: 40,
          backgroundColor: theme.palette.background.paper2,
          color: theme.palette.text.primary,
        }}
      >
        U
      </Avatar>
      <Box flexGrow={1}>
        <TextEditor
          mode="basic"
          value={comment}
          initialValue={init}
          exportContent={(data) => {
            setComment(data);
          }}
        />
        <Box display="flex" justifyContent="flex-end" marginTop={1}>
          <Button
            sx={{
              backgroundColor: theme.palette.background.paper2,
              color: theme.palette.text.primary,
            }}
            disableElevation
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function CommentItem({
  username,
  avatar,
  comment,
  likes,
  timestamp,
  deep = 1,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replies, setReplies] = useState<CommentData[]>([]);
  const theme = useTheme();

  const handleReply = (replyText: string) => {
    setReplies([
      ...replies,
      {
        username: 'You',
        avatar: '/placeholder.svg?height=32&width=32',
        comment: replyText,
        timestamp: 'Just now',
        likes: 0,
      },
    ]);
    setIsReplying(false);
  };

  return (
    <Box>
      <Box display="flex">
        <Avatar
          src={avatar}
          alt={username}
          sx={{
            marginRight: 2,
            width: 40,
            height: 40,
            background: theme.palette.background.paper2,
            color: theme.palette.text.primary,
          }}
        >
          {username.charAt(0)}
        </Avatar>
        <Box flexGrow={1}>
          <Box display="flex" alignItems="center">
            <Typography
              variant="subtitle2"
              component="span"
              fontWeight="bold"
              color="text.primary"
            >
              {username}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              color="text.secondary"
              sx={{ marginLeft: 1 }}
            >
              {timestamp}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            paragraph
            sx={{ mt: 0.5, color: 'text.primary' }}
            dangerouslySetInnerHTML={{ __html: comment }} 
          />
          <Box display="flex" alignItems="center">
            <IconButton size="small" aria-label="like">
              <ThumbUpIcon
                sx={{ color: theme.palette.text.primary }}
                fontSize="small"
              />
            </IconButton>
            <Typography
              variant="caption"
              sx={{ marginRight: 1, color: 'text.secondary' }}
            >
              {likes}
            </Typography>
            <IconButton size="small" aria-label="dislike">
              <ThumbDownIcon
                sx={{ color: theme.palette.text.primary }}
                fontSize="small"
              />
            </IconButton>
            <Button
              startIcon={<ReplyIcon />}
              size="small"
              sx={{
                marginLeft: 2,
                color: theme.palette.text.primary,
              }}
              variant="text"
              onClick={() => setIsReplying(!isReplying)}
            >
              Trả lời
            </Button>
          </Box>
        </Box>
      </Box>

      {isReplying && (
        <Box ml={7} mt={2}>
          <CommentInput
            onSubmit={handleReply}
            placeholder="Add a reply..."
            buttonText="Trả lời"
            init={`@${username}`}
          />
        </Box>
      )}

      {replies.length > 0 && (
        <Box ml={deep === 1 ? 7 : 0} mt={2}>
          <Stack spacing={2}>
            {replies.map((reply, index) => (
              <CommentItem
                deep={deep + 1}
                key={index}
                username={reply.username}
                avatar={reply.avatar}
                comment={reply.comment}
                likes={reply.likes}
                timestamp={reply.timestamp}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
