import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600  # Adjust to match your foreground size
FPS = 60
COW_COUNT_RANGE = (1, 15)
FONT_SIZE = 32

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Load assets
foreground = pygame.image.load("python-cows/cows-images/cows-foreground.png")  # Your foreground image
background = pygame.image.load("python-cows/cows-images/cows-background.png")  # Your background image
cow_img = pygame.image.load("python-cows/cows-images/cow1.png")  # Image for cows

# Scale images if needed
foreground = pygame.transform.scale(foreground, (WIDTH, HEIGHT))
background = pygame.transform.scale(background, (WIDTH, HEIGHT))
cow_img = pygame.transform.scale(cow_img, (50, 50))  # Adjust cow size

# Setup screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Cow Counting Game")

# Font
font = pygame.font.Font(None, FONT_SIZE)

# Variables
bg_x = 0  # Background scrolling position
speed = 2  # Speed of scrolling
score = 0
time_left = 60  # Game lasts for 1 minute
clock = pygame.time.Clock()

# Function to generate cows
def generate_cows():
    num_cows = random.randint(*COW_COUNT_RANGE)
    cow_positions = [[random.randint(100, WIDTH - 100), random.randint(300, 500)] for _ in range(num_cows)]
    return num_cows, cow_positions

# Function to generate answer choices
def generate_choices(correct):
    choices = [correct, random.randint(*COW_COUNT_RANGE), random.randint(*COW_COUNT_RANGE)]
    random.shuffle(choices)
    return choices

# Initial cow generation
num_cows, cow_positions = generate_cows()
choices = generate_choices(num_cows)

# Game loop
running = True
while running:
    screen.fill(WHITE)

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            x, y = event.pos
            for i, choice in enumerate(choices):
                if 50 + i * 100 < x < 150 + i * 100 and 520 < y < 560:  # Button area
                    if choice == num_cows:
                        score += 1  # Correct answer
                    num_cows, cow_positions = generate_cows()  # New round
                    choices = generate_choices(num_cows)

    # Move background in the opposite direction (to the right)
    bg_x += speed
    if bg_x >= WIDTH:
        bg_x = 0  # Loop background

    # Move cows in sync with background scrolling
    for pos in cow_positions:
        pos[0] += speed  # Move cows to the right
    
    # Draw background twice for continuous scroll
    screen.blit(background, (bg_x, 0))
    screen.blit(background, (bg_x - WIDTH, 0))

    # Draw cows
    for pos in cow_positions:
        screen.blit(cow_img, tuple(pos))

    # Draw foreground
    screen.blit(foreground, (0, 0))

    # Draw choices
    for i, choice in enumerate(choices):
        pygame.draw.rect(screen, BLACK, (50 + i * 100, 520, 100, 40))
        text = font.render(str(choice), True, WHITE)
        screen.blit(text, (75 + i * 100, 530))

    # Draw score
    score_text = font.render(f"Score: {score}", True, BLACK)
    screen.blit(score_text, (10, 10))

    # Draw timer
    timer_text = font.render(f"Time: {int(time_left)}", True, BLACK)
    screen.blit(timer_text, (WIDTH - 150, 10))

    # Update timer
    time_left -= 1 / FPS
    if time_left <= 0:
        running = False  # End game

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
