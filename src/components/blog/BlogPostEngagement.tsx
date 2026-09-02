"use client";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import { SmallButton, SmallText } from "@components/ui/Typography";
import { usePostEngagement } from "../../hooks/usePostEngagement";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-6);
  color: var(--color-text-muted);
`;

const Stat = styled(SmallText)`
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const LikeButton = styled(SmallButton)`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-hover);
  }

  &[data-liked="true"] {
    color: var(--color-primary);
  }
`;

export default function BlogPostEngagement({ slug }: { slug: string }) {
  const { views, likes, liked, toggleLike, toggling } = usePostEngagement(slug);

  return (
    <Wrapper>
      <Stat>
        <AiOutlineEye />
        {views === null ? "..." : views}
      </Stat>
      <LikeButton data-liked={liked} disabled={toggling} onClick={toggleLike}>
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        {likes === null ? "..." : likes}
      </LikeButton>
    </Wrapper>
  );
}
