import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 30px;
  background: #fee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 28px;
  margin-bottom: 15px;
  font-weight: 700;
`;

const Message = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

export function PaymentFailurePage() {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    // Redirect back to checkout
    window.location.href = "/checkout";
  };

  return (
    <Container>
      <Card>
        <Icon>❌</Icon>
        <Title>Payment Failed</Title>
        <Message>
          Unfortunately, your payment could not be processed. Please check your payment details and try again. If the problem persists, please contact our support team.
        </Message>
        <ButtonGroup>
          <Button 
            onClick={handleRetry} 
            disabled={retrying}
            style={{ width: "100%" }}
          >
            {retrying ? "Redirecting..." : "Try Again"}
          </Button>
          <Link to="/dashboard">
            <Button variant="secondary" style={{ width: "100%" }}>
              Back to Dashboard
            </Button>
          </Link>
        </ButtonGroup>
      </Card>
    </Container>
  );
}
