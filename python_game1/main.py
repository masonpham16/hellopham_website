import pygame
import random

# Initialize pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)
FONT = pygame.font.Font(None, 50)

# Choices
CHOICES = ["Rock", "Paper", "Scissors"]

# Screen setup
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Rock Paper Scissors")

# Load background image
background = pygame.image.load("python_game1/RPS-images/RPS-background.png")  # Change to your image path
background = pygame.transform.scale(background, (WIDTH, HEIGHT))

# Button class
class Button:
    def __init__(self, x, y, text):
        self.rect = pygame.Rect(x, y, 200, 80)
        self.text = text

    def draw(self):
        pygame.draw.rect(screen, GRAY, self.rect, border_radius=10)
        text_surf = FONT.render(self.text, True, BLACK)
        screen.blit(text_surf, (self.rect.x + 50, self.rect.y + 20))

    def is_clicked(self, pos):
        return self.rect.collidepoint(pos)

# Create buttons
buttons = [
    Button(100, 400, "Rock"),
    Button(300, 400, "Paper"),
    Button(500, 400, "Scissors")
]

# Game loop variables
running = True
player_choice = ""
computer_choice = ""
result = ""

while running:
    screen.blit(background, (0, 0))  # Draw background image
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            for button in buttons:
                if button.is_clicked(event.pos):
                    player_choice = button.text
                    computer_choice = random.choice(CHOICES)
                    
                    if player_choice == computer_choice:
                        result = "It's a tie!"
                    elif (player_choice == "Rock" and computer_choice == "Scissors") or \
                         (player_choice == "Paper" and computer_choice == "Rock") or \
                         (player_choice == "Scissors" and computer_choice == "Paper"):
                        result = "You Win!"
                    else:
                        result = "You Lose!"
    
    # Draw buttons
    for button in buttons:
        button.draw()
    
    # Display choices
    player_text = FONT.render(f"You: {player_choice}", True, BLACK)
    computer_text = FONT.render(f"Computer: {computer_choice}", True, BLACK)
    result_text = FONT.render(result, True, BLACK)
    
    screen.blit(player_text, (100, 100))
    screen.blit(computer_text, (100, 200))
    screen.blit(result_text, (100, 300))
    
    pygame.display.flip()

pygame.quit()
