from django.core.management.base import BaseCommand
from tracker.models import User, Team, Activity, Leaderboard, Workout
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            self.stdout.write(self.style.WARNING('Deleting old data...'))
            User.objects.all().delete()
            Team.objects.all().delete()
            Activity.objects.all().delete()
            Leaderboard.objects.all().delete()
            Workout.objects.all().delete()

            self.stdout.write(self.style.SUCCESS('Creating teams...'))
            marvel = Team.objects.create(name='Team Marvel')
            dc = Team.objects.create(name='Team DC')

            self.stdout.write(self.style.SUCCESS('Creating users...'))
            users = [
                User(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
                User(name='Iron Man', email='ironman@marvel.com', team=marvel),
                User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
                User(name='Batman', email='batman@dc.com', team=dc),
            ]
            for user in users:
                user.save()

            self.stdout.write(self.style.SUCCESS('Creating activities...'))
            Activity.objects.create(user=users[0], type='Running', duration=30, calories=200)
            Activity.objects.create(user=users[1], type='Cycling', duration=45, calories=350)
            Activity.objects.create(user=users[2], type='Swimming', duration=60, calories=400)
            Activity.objects.create(user=users[3], type='Yoga', duration=50, calories=150)

            self.stdout.write(self.style.SUCCESS('Creating workouts...'))
            Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes', difficulty='Medium')
            Workout.objects.create(name='Strength Training', description='Strength for all heroes', difficulty='Hard')

            self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
            Leaderboard.objects.create(user=users[0], score=1000)
            Leaderboard.objects.create(user=users[1], score=900)
            Leaderboard.objects.create(user=users[2], score=950)
            Leaderboard.objects.create(user=users[3], score=920)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))