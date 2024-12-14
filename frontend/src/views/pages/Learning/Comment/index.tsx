import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Link as MUILink } from '@mui/material';
import { Link } from 'react-router-dom';

// soket
import { io } from 'socket.io-client';

// redux
import { useSelector } from 'react-redux';
// mui
import { Avatar, Box, Button, Typography, IconButton, Stack, useTheme } from '@mui/material';
// healessTippy
import HeadlessTippy from '@tippyjs/react/headless';
// icon
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Reply as ReplyIcon } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
//custom hook
import useQueryParams from '@/hooks/useQueryParams';
import { getCommentByResourceId, createComment, deleteComment } from '@/api/CommentApi';

// text
import TextEditor from '@/components/TextEditor';
import { RootState } from '@/store/reducer';

// my pj
import Wrapper from '@/components/Wrapper';
interface User {
  _id?: string;
  name: string;
  profile_picture: string;
  nickname: string;
}

interface CommentData {
  resource_id: string;
  user: User;
  content: string;
  likes: number;
  createdAt: string;
  parent_id?: string | null;
  replies: CommentData[];
  _id: string;
}

interface CommentInputProps {
  mutation: any;
  user: User;
  onSubmit?: (comment: string) => void;
  placeholder?: string;
  buttonText?: string;
  init?: string;
}

interface CommentItemProps {
  user: User;
  fatherCommentUser?: CommentData['user'] | null;
  comment: CommentData;
  deep?: number;

  parent_id: string | null;
}
import { CommentPayloadData } from '@/interfaces/Comment';
import { BeatLoader } from 'react-spinners';
import path from '@/constants/routes';

const socket = io(import.meta.env.VITE_URL_SERVER);

export default function Comment() {
  const { get } = useQueryParams();
  const resource_id = get('id');
  const comment_id = get('comment');

  const user = useSelector((state: RootState) => state.authReducer.user);

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['comment', resource_id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey as [string, string];
      return getCommentByResourceId(id);
    },
  });

  const mutation = useMutation({
    mutationKey: ['comment'],
    mutationFn: createComment,
  });
  // socket
  useEffect(() => {
    if (resource_id) {
      // Tham gia vào phòng dựa trên `resource_id`
      socket.emit('joinCommentRoom', resource_id);
    }
    socket.on('newComment', (data) => {
      console.log(data);
      refetch();
    });
    socket.on('deleteComment', (data) => {
      console.log(data);
      refetch();
    });

    return () => {
      if (resource_id) {
        socket.emit('leaveCommentRoom', resource_id); // Thoát phòng khi rời
      }
      socket.off('newComment'); // Hủy lắng nghe sự kiện
      socket.off('deleteComment'); // Hủy lắng nghe sự kiện
    };
  }, [resource_id]);

  const handleComment = (content: string) => {
    if (resource_id && user?._id) {
      const payloadData: CommentPayloadData = {
        resource_id: resource_id,
        user_id: user._id,
        content,
      };
      mutation.mutate(payloadData);
    }
  };

  useEffect(() => {
    const comments = document.querySelectorAll('.comments');

    comments.forEach((comment) => {
      const id = (comment as HTMLElement).getAttribute('data-id'); // Ép kiểu comment thành HTMLElement

      if (id === comment_id) {
        // Ép kiểu lại để sử dụng `style`
        const element = comment as HTMLElement;

        element.scrollIntoView({
          behavior: 'instant',
          block: 'start',
          inline: 'nearest',
        });

        // Thay đổi style của phần tử
        element.style.border = '2px solid red';
        element.style.transition = 'border 0.5s ease-in-out';

        // Xóa border sau 2 giây
        setTimeout(() => {
          element.style.border = 'none';
        }, 2000);
      }
    });
  }, [comment_id]);

  if (isLoading) return <div>Loading comments...</div>;
  return (
    <Box maxWidth="md" margin="auto" padding={2}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Bình luận
      </Typography>
      <CommentInput mutation={mutation} user={user} onSubmit={handleComment} buttonText="Bình luận" />
      <Stack spacing={3}>
        {comments.length ? (
          comments.map((c: CommentData) => (
            <CommentItem user={user} key={c._id} comment={c} parent_id={c._id} deep={1} />
          ))
        ) : (
          <Box textAlign={'center'}>Không có nội dung comment</Box>
        )}
      </Stack>
    </Box>
  );
}

function CommentInput({ user, onSubmit, buttonText = 'Bình luận', init = '', mutation }: CommentInputProps) {
  const [comment, setComment] = useState<string>(init);
  const theme = useTheme();

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit && onSubmit(comment);
      setComment(''); // Clear comment input after submit
    }
  };

  return (
    <Box display="flex" alignItems="flex-start">
      <Avatar
        src={user?.profile_picture}
        sx={{
          marginRight: 2,
          width: 40,
          height: 40,
          backgroundColor: theme.palette.background.paper2,
          color: theme.palette.text.primary,
        }}
      ></Avatar>
      <Box flexGrow={1}>
        <TextEditor mode="basic" value={comment} onChange={(data) => setComment(data)} />
        <Box display="flex" justifyContent="flex-end" marginTop={1}>
          <Button
            sx={{
              backgroundColor: theme.palette.background.paper2,
              color: theme.palette.text.primary,
            }}
            disableElevation
            onClick={handleSubmit}
          >
            {mutation.isPending ? <BeatLoader style={{ marginLeft: '3px' }} size={10} /> : buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function CommentItem({ user, fatherCommentUser = null, comment, deep = 1 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const theme = useTheme();

  const mutation = useMutation({
    mutationKey: ['comment'],
    mutationFn: createComment,
    onSuccess: () => {
      setIsReplying(false);
    },
  });

  const handleReply = async (content: string) => {
    console.log(`Reply to ${comment.user.name}:`, content);
    if (comment.resource_id && user?._id && comment._id && content) {
      const payloadData: CommentPayloadData = {
        resource_id: comment.resource_id,
        user_id: user._id,
        parent_id: comment._id,
        content,
      };
      mutation.mutate(payloadData);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (confirm('Bạn có muốn xóa comment này không?')) {
      await deleteComment(id);
    }
  };

  return (
    <Box className="comments" data-id={comment._id}>
      <Box display="flex">
        <Avatar
          target='_blank'
          to={path.client.profile(`?id=${comment.user._id}`)}
          component={Link}
          src={comment.user.profile_picture}
          alt={comment.user.name}
          sx={{
            marginRight: 2,
            width: 40,
            height: 40,
            background: theme.palette.background.paper2,
            color: theme.palette.text.primary,
          }}
        />
        <Box flexGrow={1}>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" component="span" fontWeight="bold" color="text.primary">
              {comment.user.name}
            </Typography>
            <Typography variant="caption" component="span" color="text.secondary" sx={{ marginLeft: 1 }}>
              {moment(comment.createdAt).fromNow()}
            </Typography>
            {user._id === comment.user._id && (
              <HeadlessTippy
                trigger="click"
                placement="bottom-start"
                interactive
                allowHTML
                render={(attrs) => (
                  <Wrapper {...attrs} style={{ padding: 0 }}>
                    <Button onClick={() => handleDeleteComment(comment._id)}>Xóa bình luận</Button>
                  </Wrapper>
                )}
              >
                <Button>
                  <MoreHorizIcon sx={{ fontSize: '20px' }} />
                </Button>
              </HeadlessTippy>
            )}
          </Box>
          <Typography variant="body2" paragraph sx={{ mt: 0.5, color: 'text.primary' }}>
            <Box display={'flex'}>
              {fatherCommentUser && (
                <MUILink
                  mr={1}
                  target="_blank"
                  to={path.client.profile(`?id=${fatherCommentUser._id}`)}
                  component={Link}
                >
                  @{fatherCommentUser.name}
                </MUILink>
              )}
              {/* Nội dung comment */}
              <span dangerouslySetInnerHTML={{ __html: comment.content }} />
            </Box>
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton size="small" aria-label="like">
              <ThumbUpIcon sx={{ color: theme.palette.text.primary }} fontSize="small" />
            </IconButton>
            <Typography variant="caption" sx={{ marginRight: 1, color: 'text.secondary' }}>
              {comment.likes}
            </Typography>
            <IconButton size="small" aria-label="dislike">
              <ThumbDownIcon sx={{ color: theme.palette.text.primary }} fontSize="small" />
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
            mutation={mutation}
            user={user}
            onSubmit={handleReply}
            placeholder="Add a reply..."
            buttonText="Trả lời"
          />
        </Box>
      )}

      {comment.replies.length > 0 && (
        <Box ml={deep === 1 ? 7 : 0} mt={2}>
          <Stack spacing={2}>
            {comment.replies.map((reply, index) => (
              <CommentItem
                parent_id={comment._id}
                user={user}
                fatherCommentUser={comment.user}
                key={index}
                comment={reply}
                deep={deep + 1}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
