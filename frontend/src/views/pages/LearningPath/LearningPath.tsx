import React, { useEffect, useState } from 'react';
import imgCard from '@/assets/images/course/iimg-langage.png'
import imgCard1 from '@/assets/images/course/image-3.png'

import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface Course {
  id: string;
  title: string;
  description: string;
  path: string;
}

const LearningPath: React.FC = () => {
  const [posts, setPosts] = useState<Course[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/routes');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container sx={{ paddingY: 4 }}>
      <Grid container spacing={3}>
        {/* Left Side: Title, Subtitle, and Courses Cards */}
        <Grid item xs={12} md={8}>
          {/* Title and Subtitle Box */}
          <Box sx={{ marginBottom: 4, width: '100%' }}>
            <Typography variant="h2" fontWeight="700" fontSize={30} gutterBottom>
              Lộ trình học
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1rem', maxWidth: '600px' }}>
              Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ:
              <br />
              Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình
              <br />
              "Front-end".
            </Typography>
          </Box>

          {/* Courses Section */}
          <Typography variant="h4" fontWeight="600" gutterBottom>
            Hãy chọn hướng đi mà bạn mong muốn:
          </Typography>
          <Grid container spacing={3}>
            {posts.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    '&:hover .overlay': {
                      bottom: 0,
                      
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={imgCard}
                    alt={item.title}
                    sx={{
                      width: '100%',
                      height: '100%',   
                      objectFit: 'cover',
                      transition: 'filter 0.3s ease',  
                      '&:hover': {
                        filter: 'blur(8px)',  
                      },
                    }}
                    className="card-image" 
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      bottom: '-100%',
                      left: 0,
                      right: 0,
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'bottom 0.5s ease',
                      padding: 2,
                    }}
                  >
                    <Typography variant="h6" fontSize={18} color={'#fff'} fontWeight="600" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" textAlign="center" sx={{ width: '100%' }}>
                      {item.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/${item.path}`}
                      sx={{ marginTop: 2 }}
                    >
                      Xem ngay
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side: News Section (Sidebar on the right) */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 0, height: '100%' }}>
            <Typography variant="h3" fontWeight="600" gutterBottom>
              Tin tức
            </Typography>
            <List>
              {[
                'Lập trình là gì?',
                'Kiến thức cần có cho người mới',
                'Học thế nào cho hiệu quả',
                'Ngôn ngữ lập trình là gì?',
                'Cách thức vận hành 1 trang web'
              ].map((text, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Card sx={{ marginTop: 2 }}>
              <CardMedia
                component="img"
                image={imgCard1}
                alt="Tin tức"
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LearningPath;
