import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NewsFeedService {
  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = 'http://localhost:3000/api/news-feed';

  private getHeaders(userId: string) {
    return {
      'X-User-Id': userId,
    };
  }

  // ============================================
  // FEED ENDPOINTS
  // ============================================

  getFeed(page: number, limit: number, userId: string): Observable<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(`${this.API_BASE_URL}`, {
        params: { page: page.toString(), limit: limit.toString() },
        headers: this.getHeaders(userId),
      })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error loading feed:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  // ============================================
  // COMMENT ENDPOINTS
  // ============================================

  getComments(postId: string, userId: string): Observable<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(`${this.API_BASE_URL}/posts/${postId}/comments`, {
        headers: this.getHeaders(userId),
      })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error loading comments:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  createComment(
    postId: string,
    content: string,
    userId: string,
    parentId?: string,
  ): Observable<ApiResponse<any>> {
    return this.http
      .post<
        ApiResponse<any>
      >(`${this.API_BASE_URL}/posts/${postId}/comments`, { content, parentId }, { headers: this.getHeaders(userId) })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error creating comment:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  deleteComment(commentId: string, userId: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<ApiResponse<any>>(`${this.API_BASE_URL}/comments/${commentId}`, {
        headers: this.getHeaders(userId),
      })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error deleting comment:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  toggleCommentLike(commentId: string, userId: string): Observable<ApiResponse<any>> {
    return this.http
      .post<
        ApiResponse<any>
      >(`${this.API_BASE_URL}/comments/${commentId}/like`, {}, { headers: this.getHeaders(userId) })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error toggling comment like:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  // ============================================
  // INTERACTION ENDPOINTS
  // ============================================

  toggleLike(postId: string, userId: string): Observable<ApiResponse<any>> {
    return this.http
      .post<
        ApiResponse<any>
      >(`${this.API_BASE_URL}/posts/${postId}/like`, {}, { headers: this.getHeaders(userId) })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error toggling like:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  togglePin(postId: string, userId: string): Observable<ApiResponse<any>> {
    return this.http
      .post<
        ApiResponse<any>
      >(`${this.API_BASE_URL}/posts/${postId}/pin`, {}, { headers: this.getHeaders(userId) })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error toggling pin:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  toggleSave(postId: string, userId: string): Observable<ApiResponse<any>> {
    return this.http
      .post<
        ApiResponse<any>
      >(`${this.API_BASE_URL}/posts/${postId}/save`, {}, { headers: this.getHeaders(userId) })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error toggling save:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  // ============================================
  // USER DATA ENDPOINTS
  // ============================================

  getUserInteractions(userId: string): Observable<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(`${this.API_BASE_URL}/user/interactions`, {
        headers: this.getHeaders(userId),
      })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error loading user interactions:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  getRecentActivity(userId: string): Observable<ApiResponse<any>> {
    return this.http
      .get<ApiResponse<any>>(`${this.API_BASE_URL}/user/recent-activity`, {
        headers: this.getHeaders(userId),
      })
      .pipe(
        catchError((error) => {
          console.error('[NewsFeedService] Error loading recent activity:', error);
          return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
        }),
      );
  }

  getTrendingTopics(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.API_BASE_URL}/trending`).pipe(
      catchError((error) => {
        console.error('[NewsFeedService] Error loading trending topics:', error);
        return of({ success: false, error: { code: 'NETWORK_ERROR', message: error.message } });
      }),
    );
  }
}
